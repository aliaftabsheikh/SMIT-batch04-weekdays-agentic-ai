# import calc
# import requests
# import math

# import numpy as np

# from math import *
# from numpy import *

#! Custom module import calc

# from calc import add as addition, subtract as subtraction

# #! Built in module import math

# from math import sqrt as s, pi as p

# #! Third party module import requests

# from requests import get as get_request 

# from math import *
# from calc import *

# print(calc.add(5, 10))
# print(calc.subtract(10, 5))
# print(calc.square_root(36))

# response = requests.get('https://jsonplaceholder.typicode.com/todos')

# print(response.json())





# print(math.sqrt(51))
# print(math.pi)


# print(np.array([1, 2, 3]))

# print(addition(5, 10))
# print(subtraction(10, 5))

# print(s(36))
# print(p)


# print(sqrt(81))
# print(add(5, 10))
# print(subtract(10, 5))


# print(pi)


# def greet():
#     return "Hello!"

# def greet(name: str) -> str: 
#     return f"Hello, {name}!"

# print(greet("Ali"))
# print(greet("Waqar"))
# print(greet("Sami"))
# import calc
# import requests
# import math

# import numpy as np

# from math import *
# from numpy import *

#! Custom module import calc

# from calc import add as addition, subtract as subtraction

# #! Built in module import math

# from math import sqrt as s, pi as p

# #! Third party module import requests

# from requests import get as get_request 

# from math import *
# from calc import *

# print(calc.add(5, 10))
# print(calc.subtract(10, 5))
# print(calc.square_root(36))

# response = requests.get('https://jsonplaceholder.typicode.com/todos')

# print(response.json())





# print(math.sqrt(51))
# print(math.pi)


# print(np.array([1, 2, 3]))

# print(addition(5, 10))
# print(subtraction(10, 5))

# print(s(36))
# print(p)


# print(sqrt(81))
# print(add(5, 10))
# print(subtract(10, 5))


# print(pi)


# def greet():
#     return "Hello!"




guest_list: list = [
    {
        "name": "Ali",
        "phone_number": "1234567890",
        "person_invited": 3
    },
    {
        "name": "Waqar",
        "phone_number": "0987654321",
        "person_invited": 2
    },
    {
        "name": "Sami",
        "phone_number": "1122334455",
        "person_invited": 4
    }
    ]

def greet(name: str, phone_number: str, person_invited: int) -> str :
    return f"Hello, {name}! Your phone number is {phone_number} and you have invited {person_invited} people."

for guest in guest_list:
    #! Positional arguments
    # print(greet(guest["name"], guest["phone_number"], guest["person_invited"]))
    
    #! Keyword arguments
    print(greet( phone_number=guest["phone_number"], person_invited=guest["person_invited"], name=guest["name"]))
