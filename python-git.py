import requests
import base64
from git import Repo

# Replace with your Azure DevOps PAT, project name, repository name, file path, and branch name
PAT = "YOUR_PAT"
project_name = "YOUR_PROJECT_NAME"
repository_name = "YOUR_REPOSITORY_NAME"
file_path = "path/to/your/file.txt"
target_branch = "main"

# Get the latest file content
url = f"https://dev.azure.com/{project_name}/_apis/git/repositories/{repository_name}/commits/{target_branch}/contents/{file_path}?api-version=6.0-preview.4"
headers = {"Authorization": f"Basic {base64.b64encode(f'{PAT}:'.encode()).decode()}"}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    original_content = base64.b64decode(response.json()["content"]).decode()
else:
    print(f"Error retrieving file content: {response.status_code}")
    exit(1)

# Make your desired changes to the content
modified_content = original_content.replace("old_text", "new_text")  # Replace with your actual changes

# Create a local Git repository (if needed)
repo_dir = f"/tmp/ado_update_{repository_name}"  # Modify if needed
if not os.path.exists(repo_dir):
    os.makedirs(repo_dir)
repo = Repo.init(repo_dir)

# Create a new branch and checkout
branch = repo.create_head(target_branch)
repo.heads.checkout(branch)

# Create the file and add it to the staging area
with open(file_path, "w") as f:
    f.write(modified_content)
repo.index.add([file_path])

# Commit the changes with a clear message
commit_message = "Update file with Python script"
repo.index.commit(commit_message)

# Push the changes to the remote repository
origin = repo.remote("origin")
origin.push()

print("File updated and pushed successfully!")
