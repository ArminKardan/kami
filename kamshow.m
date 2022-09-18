function[] = kamshow(date)
warning ('off','all');
h1=figure

tiledlayout(2,2, 'Padding', 'none', 'TileSpacing', 'compact'); 
nexttile
pout = imread(strcat('./f1/',date,'.jpg'));
imshow(pout,'InitialMagnification', 200);
nexttile
pout = imread(strcat('./f2/',date,'.jpg'));
imshow(pout,'InitialMagnification', 200);


    
    
hgexport(h1,'go.jpg',hgexport('factorystyle'),'format','jpeg')
end