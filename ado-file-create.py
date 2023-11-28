import requests

# Replace these with your Azure DevOps credentials
organization_url = "https://dev.azure.com/your-organization"
personal_access_token = "your-personal-access-token"

# Replace these with the project, repository, and branch names
project_name = "your-project"
repository_name = "your-repository"
branch_name = "your-new-branch"

# Set the API URL and headers
api_url = f"{organization_url}/apis/git/repositories/{project_name}/{repository_name}/refs"
headers = {
    "Authorization": f"Basic {base64.b64encode(personal_access_token.encode('utf-8')).decode('utf-8')}",
    "Content-Type": "application/json",
}

# Set the request body
request_body = {
    "name": branch_name,
    "objectId": "refs/heads/main"
}

# Make the PATCH request
response = requests.patch(api_url, json=request_body, headers=headers)

if response.status_code == 200:
    print("Branch created successfully")
else:
    print(f"Error creating branch: {response.status_code}")
