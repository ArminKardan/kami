close all
clc
warning ('off','all');

files = dir('fest_10cm_depth')

for i=3:length(files)
close all
outp = figure

subplot(2,2,1)
pout = imread(strcat('./fest_10cm_depth/',files(i).name));
imshow(pout,'InitialMagnification', 200);

subplot(2,2,2)
pout = imread(strcat('./fest_original_depth/',files(i).name));
imshow(pout,'InitialMagnification', 200);

subplot(2,2,3)
pout = imread(strcat('./sat/',files(i).name));
imshow(pout,'InitialMagnification', 200);

hgexport(outp,strcat('./Histogram/',files(i).name),hgexport('factorystyle'),'format','jpeg')
end