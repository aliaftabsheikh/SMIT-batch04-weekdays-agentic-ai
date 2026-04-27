# OOP 4 pillars

# Polymorphism
# Encapsulation
# Abstraction
# Inheritance

# class Car:
#     def __init__(self, make, model, year):
#         self.make = make
#         self.model = model
#         self.year = year

#     def start_engine(self):
#         print("The engine is starting...")

#     def stop_engine(self):
#         print("The engine is stopping...")
        
# class ElectricCar(Car):
#     pass

# e1 = ElectricCar("Tesla", "Model S", 2020)
# print(e1)



# class Human:
#   spice = "Lal mirch" 

#   @classmethod
#   def get_specie(cls): # python environment will automatically pass the 'cls' as a parameter
#     return cls.spice


# h1 = Human()
# print(h1.__dict__)


# print(Human.get_specie())


# class Human:
    
#     @staticmethod
#     def breath():
#         print("Breathing...")
        
        
# h1 = Human()
# h1.breath()


class Animal:
    species = "Unknown"

    @classmethod
    def make(cls):
        return cls()  # ← this is the magic

class Dog(Animal):
    species = "Dog"
    
animal = Animal.make()
print(animal)
print(type(animal))

dog = Dog.make()
print(dog)
print(type(dog))  #