import os

def create_directory(directory, caption):
    # Create an index.html file
    with open(os.path.join(directory, 'index.html'), 'w') as f:
        f.write('<html><body><h3>' + caption + '</h3><ul>')
        
        # Loop through files in the directory and add them as list items
        for filename in sorted(os.listdir(directory)):
            if filename.endswith('.txt'):
                f.write(f'<li><a target="_blank" href="{filename}">{filename}</a></li>')

        f.write('</ul></body></html>')

    print('index.html generated.')

create_directory('./practice_notes', 'sweetums practice notes')
create_directory('./flagday', 'flag day songs')