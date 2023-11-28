from azure.devops.connection import Connection
from msrest.authentication import BasicAuthentication
import pprint

# Azure DevOps organization URL and personal access token
organization_url = "https://dev.azure.com/YOUR_ORGANIZATION_NAME"
personal_access_token = "YOUR_PERSONAL_ACCESS_TOKEN"

# Project and repository details
project_name = "YOUR_PROJECT_NAME"
repository_name = "YOUR_REPOSITORY_NAME"

# Source branch (the branch you want to branch off from)
source_branch = "main"

# New branch name
new_branch_name = "feature/new-feature-branch"

def create_new_branch():
    # Create a connection to the Azure DevOps organization
    credentials = BasicAuthentication('', personal_access_token)
    connection = Connection(base_url=organization_url, creds=credentials)

    # Get the repository
    repository_client = connection.clients.get_git_client()
    repository = repository_client.get_repository(project=project_name, repository_id=repository_name)

    # Get the source branch object
    source_branch_object = repository_client.get_branch(
        project=project_name, repository_id=repository_name, branch_name=source_branch
    )

    # Create a new branch
    new_branch_object = {
        'name': new_branch_name,
        'type': 'version',
        'base_version_descriptor': {
            'version_type': 'branch',
            'version': source_branch_object.commit.committer.date,
            'version_options': 'previousChange',
            'version_spec': source_branch,
        }
    }

    created_branch = repository_client.create_branch(
        new_branch_object, project=project_name, repository_id=repository_name
    )

    pprint.pprint(created_branch)

if __name__ == "__main__":
    create_new_branch()
