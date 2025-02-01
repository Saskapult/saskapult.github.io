+++
title = "Harmonic Coordinates"
date = 2024-04-18

description = "An implementation of Harmonic Coordinates for Character Articulation, and elaboration on the mock paper I wrote for it."

[extra]
show_only_description = true

[taxonomies]
tags=["class", "resume"]
+++

{{ image(src="/harmonic/ratwave-ezgif-optimize-larger.gif", alt="a rat deformed to follow a sine wave",
         style="border-radius: 8px;width: 35%;float:right;") }}

An [implementation]((https://github.com/Saskapult/harmonic_coordinates)) of [Harmonic Coordinates for Character Articulation](https://graphics.pixar.com/library/HarmonicCoordinatesB/paper.pdf). 
I wrote a [mock paper](/hc_paper.pdf) about it. 

I first implemented a 2D version of this algorithm in CSC 486B (Geometric Modeling) with Teseo Schneider. 
This was accomplished in python using numpy and meshplot. 

When I needed a final project for CSC 473 (Fundamentals of Computer Animation) with Brandon Haworth, I decided to implement the algorithm in 3D. 
This implementation is written in rust, using [eframe](https://crates.io/crates/eframe) for windowing/ui and [wgpu](https://crates.io/crates/wgpu) for rendering. 

<!-- performance -->

One thing I enjoyed while working on this project was optimizing the code. 
The most computationally-intensive step involves smoothing values over a grid. 
I chose it implement this using one thread, a thread for each CPU core, and a thread for each cell on the GPU. 
In the paper, the single-threaded algorithm is the most performant. 
This is followed by the multi-threaded and GPU algorithms. 

{{ image(src="/harmonic/hc_bench.png", alt="a bar graph of computation time",
         style="border-radius: 8px;width: 50%;float:right;") }}

Almost immediately after turning in the paper, however, I found a stupidly simple optimization for my CPU-parallel algorithm. 
The multi-threaded algorithm is now the most performant by far! 



