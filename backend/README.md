clone the brach
cd backend
Install virtualenvironment:  
`pip install virtualenv`

Create virtual environment:   
`python3 -m venv env`

Activate Virual Environment:  
`source env/bin/activate`

Install Requirements:  
`pip install -r requirements.txt`

Running backend:   
`python3 manage.py makemigrations`  
`python3 manage.py migrate`  
`python3 manage.py runserver`  

This starts a development server at localhost:8000


