# Setting up the backend
## Database :  PostgreSQL
Install postgresql<br/>
`sudo apt install postgresql postgresql-contrib`
Start the PostgreSQL server <br/>
Use `sudo service postgresql start` to start running your database.<br/>
Check the status using `sudo service postgresql status`<br/>
Open the psql shell: `sudo -u postgres psql`<br/>
Create a new table using `CREATE DATABASE juice_with_ease`<br/>
Set the password for the postgres user `ALTER USER postgres PASSWORD 'myPassword'`<br/>

## API : Django REST framework
Create a venv using `python3 -m venv <environment name>`<br/>
Activate the virtual environment <br/>
`source <environment name>/bin/activate`<br/>
Run the following to install all the python dependencies <br/>
`pip install -r requirements.txt`<br/>
Start the server using <br/>
`python3 manage.py runserver` <br/>
This starts a development server at localhost:8000<br/>

# API Endpoints

## Authentication
The accounts app is use to create new user accounts.<br/>
The website handles authentication using JSON Web Tokens (JWT).<br/>
The authentication is handled by [Djoser](https://djoser.readthedocs.io/en/latest/introduction.html "Official Documentation") an Open Source REST implementation of the Django authentication system. <br/>

To access the API prepend `auth/` to the Endpoints mentions [here](https://djoser.readthedocs.io/en/latest/base_endpoints.html "Djoser Documentation").<br/>

For the JWT endpoints refer [this](https://djoser.readthedocs.io/en/latest/jwt_endpoints.html "Djoser JWT authentication")