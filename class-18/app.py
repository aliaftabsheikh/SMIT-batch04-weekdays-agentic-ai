# # class Person:
# #     def __init__(self, name, age):
# #         self.name = name
# #         self.age = age

# #     @classmethod
# #     def greet(cls):
# #         return f"Hello, I am a {cls.__name__}!"
    
# #     @staticmethod
# #     def breathe():
# #         return "Breathing..."
# # p1 = Person("Alice", 30)
# # print(p1.greet())


# def star_decorator(func):  
#     def wrapper():
#         print("★" * 5)
#         func()
#         print("★" * 5)
#     return wrapper

# @star_decorator
# def say_hello():
#     print("Hello!")
    
    
# def goodbye_decorator(func):
#     def wrapper():
#         print("Hello Chippa man !")
#         func()
#         print("Good bye Chippa man !")
#     return wrapper
    
    
# @goodbye_decorator
# def say_goodbye():
#     print('Problem solved !')

# say_goodbye()

class Person:
    def __init__(self, name):
        self._name = name  # Internal variable (convention: `_name`)

    @property
    def name(self):
        """Getter for name"""
        return self._name
    
    @name.setter
    def name(self, value):
        """Setter for name"""
        self._name = value

# Usage
person = Person("Alice")
person.name = "Bob"  # Using the setter to change the name
print("person.name: ", person.name)

