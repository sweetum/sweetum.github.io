import os

def create_directory(directory, caption):
    with open(os.path.join(directory, 'index.html'), 'w') as f:
        f.write('<html><body><h3>' + caption + '</h3><ol>')
        for filename in sorted(os.listdir(directory)):
            if filename.endswith('.txt'):
                f.write(f'<li><a target="_blank" href="{filename}">{filename}</a></li>')
        f.write('</ol></body></html>')
    print('index.html generated.')

create_directory('./practice_notes', 'sweetums practice notes')
create_directory('./flagday', 'flag day songs')
create_directory('./misc', 'misc bull shit')
create_directory('./sets', 'sweetums sets')
create_directory('./songs', 'sweetums songs')