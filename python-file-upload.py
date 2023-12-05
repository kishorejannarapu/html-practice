# views.py
import requests
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import FileUploadForm

def upload_file(request):
    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            # Prepare the file to be sent to the external API
            files = {'file': request.FILES['file'].file}

            # Make a request to the external API
            api_url = 'https://external-api.com/upload'
            response = requests.post(api_url, files=files)

            # Check if the request was successful
            if response.status_code == 200:
                # Assuming the API returns a zip file
                zip_file_content = response.content

                # You can return the zip file as a response to the caller
                response = HttpResponse(zip_file_content, content_type='application/zip')
                response['Content-Disposition'] = 'attachment; filename="result.zip"'
                return response
            else:
                # Handle API error, for example, you can display an error message
                error_message = f"Error from external API: {response.status_code}"
                return render(request, 'error.html', {'error_message': error_message})
    else:
        form = FileUploadForm()

    return render(request, 'upload_file.html', {'form': form})
