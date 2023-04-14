import os

directory = './cards'
svg_names = []  
for filename in os.listdir(directory):
        name = os.path.splitext(filename)[0]  # extract filename without extension
        svg_names.append(name)

print(svg_names)
