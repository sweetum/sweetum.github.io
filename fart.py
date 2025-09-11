import os

def create_directory(directory, caption):
    with open(os.path.join(directory, 'index.html'), 'w') as f:
        f.write('<html><head><style>* { color: black; text-decoration: none; } li:hover { text-decoration: underline; cursor: pointer; }</style></head><body><h3>' + caption + '</h3><ol>')
        for filename in sorted(os.listdir(directory)):
            if filename.endswith('.txt'):
                f.write(f'<li><a target="_blank" href="{filename}">{filename[:-4]}</a></li>')
        f.write('</ol></body></html>')
    print('index.html generated.')

create_directory('./practice_notes', 'practice notes')
create_directory('./flagday', 'flag day songs')
create_directory('./misc', 'misc bull shit')
create_directory('./sets', 'sets')
create_directory('./songs', 'songs')
create_directory('./drafts', 'drafts')