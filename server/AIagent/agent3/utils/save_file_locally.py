def save_uploaded_file_locally(f, name):
    with open('uploads/'+name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    