+++
title = "EGO Search"
date = 2025-10-06

description = "Embedding Group Overlap Search"

[taxonomies]
tags=["project"]
+++

<!-- Context -->
I've been working with retrieval augmented generation (RAG) as part of my job. 
While I can't go too much into detail, we're generating a knowledge base by feeding an LLM a bunch of pieces of text and then use that knowledge base to answer queries. 
Except in a fancy way that I should not talk about here. 
Anyway, it uses an LLM for a lot of that. 
Having a ten-year-old laptop, it's not something that I'm in a position to run locally. 
And even if I could, that's still an entire LLM we're talking about. 
I do not want to pay for the electricity to run that! 

<!-- Explain vector RAG -->
A few applications of what we're doing amount to little more than a search through a text, albeit a smart search through a text. 
One method for doing that is with the use of vector RAG. 
This utilizes a part of an LLM known as an embedding model. 
This is the "encoder" part of an LLM and in GPT-style models it is significantly smaller than the "decoder" part. 
The embedding model transforms text into a vector, a collection of numbers in some ridiculously high-dimensional space. 
Semantically similar texts generate vectors that are "close" to one another. 
We can use cosine similarity to measure this! 

$a \cdot b = |a| |b| \cos(\theta)$

What we want here is the $\theta$ value because that will tell us the angle between our two vectors. 
If it's low then they're probably similar, and if it's high they're probably unrelated. 
An embedding for "cats like catnip" would (hopefully) be similar to "what do cats like" and thus we can use this technique to retrieve relevant information for a query. 

<!-- The point! -->
This works quite well when text is broken into sufficiently-sized segments, but two questions arise: 
- What if something is split across the boundaries of these segments? 
- What if we make the segments really really small? 

This is the part of the article where I introduce [Embedding Group Overlap (EGO) Search](https://github.com/Saskapult/iiqe)! 
EGO search breaks a text into segments, constructs groups from those segments, scores those segments using embedding cosine similarity, and then finds the segments with the highest score across their member groups. 

<!-- Example -->
Let's have an example! 
You have the collection of sentences "now for something completely different," "things I like to bake," "cake is one thing," and "oh also cats are nice."
We generate some groups from these segments. 
In this minimal example those are "now for something completely different things I like to bake," "things I like to bake cake is one thing" and "cake is one thing oh also cats are nice." 
We generate embeddings for those and an embedding for a query text like "do I like to bake cake?"
Groups 1 and 2 score most highly in this, so segment 2 receives a very high score because it appears in both of those groups. 

{{ figure(src="/ego-search/sentence_level.png",
          style="width: 100%;",
          caption="A similarity graph for some sentences in some text.",
          caption_style="font-style: italic;") }}

Once we've scored the segments, we identify peaks in the score values. 
We then descend the peak to some cutoff value (in the graph example the 65th percentile) to identify "regions" of text similar to the query text. 
The algorithm outputs a list of these regions sorted by their peak score (though one could use other metrics, I just haven't tried that yet). 

A neat property of this is that a "segment" can be smaller than a sentence! 
For my demo I ran EGO Search with sentence-level segments and then ran it again at a word level on the resulting region. 
It works pretty well! 
It's also, like, the main innovation of this work so I'd sure hope that it works pretty well. 

{{ figure(src="/ego-search/word_level.png",
          style="width: 100%;",
          caption="A similarity graph for some words in some text.",
          caption_style="font-style: italic;") }}

<!-- Efficiency -->
So is it efficient? 
Hahaha... [no](https://i.kym-cdn.com/photos/images/newsfeed/000/549/301/119.jpg).
There is a lot of redundant computation in the "overlap" part of the EGO Search. 
Indexing a document takes a lot of processing power! 
That only needs to be done once, but we're still relying on cosine similarity for each query. 
I'm sure that you can find a more efficient way to search through a document! 

<!-- Conclusion -->
EGO Search uses text embeddings to retrieve information at a scalable resolution. 
It's able to retrieve semantically-relevant parts of a text and their surrounding context without the computational price of a full LLM. 
Is it particularly well-suited to that task? 
Probably not! 
But I think it's pretty neat :). 
I've made a poster for it and I'll be presenting it at the ACM Celebration of Cascadia Women in Computing 2025 Student Poster session. 

(well if they let me in, we don't know for sure yet.)

{{ figure(src="/ego-search/poster.png",
          style="width: 100%;",
          caption="My poster!",
          caption_style="font-style: italic;") }}

(yes I did consider using the "G" in EGO Search for "Godzilla" instead of "Group" and while that would have been cooler it would've made less sense)
