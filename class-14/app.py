class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        # self.name = name
        # self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")
        
      
        
 
      
p1 =  Person("Ali", 24)
# print(p1.__dict__)

p1.greet()
      
      
p2 = Person("Jaffar", 24)
# print(p2.__dict__)

p2.greet()
      
      
      
      
      
      
        
        
# p0 = Person("John", 30)
# print(p0.__dict__)

# p1 = Person("Ali", 24)   # --> {"name": "Ali", "age": 24}
# p2 = Person("Jaffar", 24)  # --> {"name": "Jaffar", "age": 24}

# print(p1.__dict__)  
# print(p2.__dict__)  





