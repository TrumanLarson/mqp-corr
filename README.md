Idea 1
---
Our original idea was to draw a violin plot over the points. We assumed that a graph with a higher r value would have a wider violin plot
and a chart with a lower r value would have a narrower violin plot. Then we thought of merging the scatter plots together so the points
and the violin plots would be on top of each other and the user could tell the difference between the distributions more easily. We also
decided to add in a trendline so the user would get a better perspective of how scattered the points were. As we were adding in the
trendline we realized that it was going to be the same for all graphs because the data generations made distribution is the same for all
graphs. Because of this, we realized that a violin plot wouldn’t work and they would be the same for all graphs. We then decided that
margin lines would be a good alternative solution. We created a margin line that ran just above the furthest point above the trendline and
we created another margin line that ran just below the furthest point below the trendline. Once we created the trendline and margin lines
we merged them together. Once we did this we knew that we had to add in some colors to differentiate between the two graphs. We chose to
color the points a different color and then fill in the space between the margin lines. We lowered the opacity of the dots and the shapes
in regions so that the user could see everything clearly once they were merged.

Idea 2
---
After receiving some feedback and a research paper from Professor Harrison, we decided to create another design and use an ellipse rather than margin lines. This way the ellipse would not be affected by outliers as much unlike the margin lines. Using calculations provided by Prof. Harrison, we were able to create an ellipse based on the F distribution of the data. We kept the same elements from the last design, such as the trendline, margin, etc.

Future Ideas
---
After further reading into the research paper, “Correlation: Judgment and Visualization Features: Comparative Study”, a couple of other
good design options are the pairwise distance and convex hull. The pairwise distance still shows the distribution of the points, but it
shows the distance of each point from the center in more detail. Pairwise distance also uses opacity for the distance so if points are
clustered together their distances will be a higher opacity. With this design, the user will have an informative visualization on the
distances of each point on the graph. I wouldn’t merge the two graphs for this design because it would take away from the opacity feature
of this design and it would be too cluttered. The convex hull is a good design because it takes into account outliers like our margin line
design but it's not as affected by them. I think this is a middle ground between our margin line and ellipse designs. It gives you an
accurate outline of the furthest points on the graph and the overall shape of the data.

Research Paper: https://visualthinking.psych.northwestern.edu/publications/YangCorrelation2018.pdf
