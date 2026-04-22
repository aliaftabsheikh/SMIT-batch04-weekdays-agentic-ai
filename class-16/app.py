# OOP 

class Person:
    def __init__(self, name, age, profession):
        self.name = name
        self.age = age
        self.profession = profession
        
    def introduce(self):
        return f"Hello, my name is {self.name}, I am {self.age} years old and I work as a {self.profession}."
    

#! Inheritance / Polymorphism
    

# class Management(Person):
#   def __init__(self, name, age, profession, department):
#     super().__init__(name, age, profession)
#     self.department = department
    
#   def introduce(self):
#     return f"Hello, my name is {self.name}, I am {self.age} years old, I work as a {self.profession} in the {self.department} department."    

# m1 = Management("Alice", 30, "Manager", "HR")

# # print(m1.__dict__)
# print("MANAGEMENT:", m1.introduce())
       
       
# print("\n")

# p1 = Person("Ali" , 25, "Developer")
# p2 = Person("Ahmed" , 30, "Designer")

# print("PERSON:", p1.introduce())
# # print(p1.__dict__)
# # print(p2.__dict__)


# !Encapsulation

# class BankAccount:
#     def __init__(self, account_number, balance):
#         self.account_number = account_number
#         self.__balance = balance  # Private attribute
        
#     def get_balance(self):
#         return f"The balance for account {self.account_number} is {self.__balance}."
    
#     def deposit(self, amount):
#         if amount > 0:
#             self.__balance += amount
#             return f"Deposited {amount}. New balance is {self.__balance}."
#         else:
#             return "Deposit amount must be positive."
        
#     def withdraw(self, amount):
#         if amount > 0 and amount <= self.__balance:
#             self.__balance -= amount
#             return f"Withdrew {amount}. New balance is {self.__balance}."
#         else:
#             return "Withdrawal amount must be positive and less than or equal to the balance."
        
        

# b1 = BankAccount("123456789", 1000)

# print(b1.deposit(500))  # This will work and update the balance
# print(b1.get_balance())  # This will work and return the private balance
# print(b1.withdraw(200))  # This will work and update the balance

# print(b1.get_balance())  # This will work and return the updated balance
# # print(b1.__balance)  # This will raise an AttributeError because __balance is private


# class Car:
#     def __del__(self):
#         print(f"The {self.brand} {self.model} has been destroyed.")

#     # Parameterized constructor
#     def __init__(self, brand, model):
#         self.brand = brand
#         self.model = model

#     # Destructor
    

# # Create an object of the Car class
# my_car = Car("Toyota", "Corolla")
# # Explicitly delete the object (triggers the destructor)
# del my_car  # Output: The Toyota Corolla has been destroyed.



#! Abstraction

# from abc import ABC, abstractmethod

class BankAccount_Template(ABC):
    
    @abstractmethod
    def get_balance(self) -> str:
       pass
   
    @abstractmethod
    def deposit(self, amount) -> str:
        pass

    @abstractmethod
    def withdraw(self, amount) -> str:
        pass


class BankAccount(BankAccount_Template):
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.__balance = balance  # Private attribute
        
    def get_balance(self) -> str:
        return f"The balance for account {self.account_number} is {self.__balance}."
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited {amount}. New balance is {self.__balance}."
        else:
            return "Deposit amount must be positive."
        
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            return f"Withdrew {amount}. New balance is {self.__balance}."
        else:
            return "Withdrawal amount must be positive and less than or equal to the balance."
        
    # @abstractmethod
    # def account_type(self):
    #     pass
    
# class SavingsAccount(BankAccount):
#     def account_type(self):
#         return "This is a savings account."

# s1 = SavingsAccount("987654321", 2000)




# b1 = BankAccount("123456789", 1000) 
# print(b1.__dict__)    

# print(b1.deposit(500))  # This will work and update the balance
# print(b1.get_balance())  # This will work and return the private balance
# print(b1.withdraw(200))  # This will work and update the balance
# print(b1.get_balance())  # This will work and return the updated balance