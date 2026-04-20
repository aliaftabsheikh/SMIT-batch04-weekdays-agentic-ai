# class Person:
#     # {}
#     def __init__(self, name, age, profession):
#         self.name = name 
#         self.age = age
#         self.profession = profession
        
#     def intro(self):
#         return f"My name is {self.name}, I am {self.age} years old and I work as a {self.profession} "
        
# p1 = Person("Ali", 24, "Software Engineer")
# p2 = Person("Khalid", 30, "Doctor")
# # print(p1.__dict__)
# # print(p2.__dict__)




# class Student(Person):
#     def __init__(self, name, age, profession, grade):
#         super().__init__(name, age, profession)
#         self.grade = grade
        
#     def intro(self):
#         return f"My name is {self.name}, I am {self.age} years old and I am a {self.profession} with grade {self.grade}"

    
# s1 = Student("Shaheer", 20, "Student", "A")
# print(p1.intro())
# print(s1.intro())


# class Employee(Person):
#     def __init__(self, name, age, profession, salary):
#         super().__init__(name, age, profession)
#         self.salary = salary
        
#     def intro(self):
#         return f"My name is {self.name}, I am {self.age} years old and I work as a {self.profession} with a salary of {self.salary}"
    
# e1 = Employee("Zain", 28, "Software Engineer", 50000)

# e1.salary = 100000
# print(e1.intro())



class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.__balance = balance
        
    def deposit(self, amount):
        self.__balance += amount
        
    def withdraw(self, amount):
        if self.__balance >= amount:
            self.__balance -= amount
        else:
            print("Insufficient funds")
            
    def get_balance(self):
        return self.__balance

b1 = BankAccount("123456789", 1000)
# b1.balance = 1000000000000000

print(b1.get_balance())
# persons: list = [
#     {
#         "name": 'Jaffar',
#         "age": 24,
#         "profession": "Student"
#     },
    
# ]





# persons.append(p1.__dict__)
# persons.append(p2.__dict__)

# print(persons)


# def test(name, age, occupation):
#     pass


# test("Ali", 24, "Software Engineer")


# person: dict = {
#     "name": "Ali",
#     "age": 24,
#     "profession": "Software Engineer"
# }


# person["cnic"] = 123456789
# print(person)