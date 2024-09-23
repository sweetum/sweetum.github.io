import os

# Directory where your practice notes are stored
directory = './practice_notes'

# Create an index.html file
with open(os.path.join(directory, 'index.html'), 'w') as f:
    f.write('<html><body><h3>sweetums practice notes</h3><ul>')

    # Loop through files in the directory and add them as list items
    for filename in sorted(os.listdir(directory)):
        if filename.endswith('.txt'):
            f.write(f'<li><a href="{filename}">{filename}</a></li>')

    f.write('</ul></body></html>')

print('index.html generated.')
