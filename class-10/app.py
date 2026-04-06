# my_string: str = "Hello, World!"
# print(my_string.split())
# print(my_string.split(" "))
# print(my_string.split("o"))

fruits: str = "apple,banana,orange"
# print(fruits.split(","))

fruits_list: list = fruits.split(",")
# print(fruits_list)

# print(', '.join(fruits_list))

# pakistani_persons: list = ["Ali", "Ahmed", "Sana"]
# print(', '.join(pakistani_persons))


# print(", ".join("Hello"))


# print('/'.join(['Apple', 'Banana', 'Cherry'])); # ; The line terminitor


# my_string: str = "Pakistan Zindabad & Paindabad"

# # my_string = my_string.replace("Zindabad", "se zinda bhag")

# # print(my_string)

# string_index: int = my_string.find("Pakistan") # find the index of the first occurrence of "Pakistan"
# # print(string_index)


# starting_index2: int = string_index + len("Pakistan") #len=8
# print(my_string[starting_index2:] ) # after slicing ", World! Hello, Pakistan


# print("Second Occurance index = ", my_string.index("Pakistan",  len("Pakistan"), len(my_string))) # find the index of the second occurrence of "Pakistan"

# count = my_string.count("Pakistan") # count the number of occurrences of "Pakistan"
# print("Count = ", count)

# my_string: str = 'My name is {} and I am {} years old.'.format("Ali", 14) #order matters
# print("line 1: ",my_string)

# my_string: str = 'My name is {1} and I am {0} years old.'.format(24, "Ali") #order matters
# print("line 1: ",my_string)

# name: str = "Ali"
# age: int = 24

# my_string: str = fr'My \name is {name} and I am {age}\n \t years \old.' #At the same time it could be f and r as well
# print("line 4: ",my_string)

# import sys

# a: str = "hello, world Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

# b: str = "hello, world Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

# print(id(a))
# print(id(b))

# print(a is b)

# import sys

# a = "hello"
# b = "world"
# c = sys.intern(a + b)  # Dynamically created string
# d = "helloworld"
# print("c is d = ", c is d)  
# print(c, " - id(c)", id(c))
# print(d, " - id(d)", id(d))

# string_methods: list = dir(str)

# # Filter out methods starting with "__"
# filtered_methods: list = [method for method in string_methods if not method.startswith("__")]

# # Print the filtered list
# print(filtered_methods)


# num_float: float = 9.8
# num_int = int(num_float) # skipped type hint to see what data type is assigned at runtime
# print(num_int, type(num_int))

# b: bool = False
# print("int(b) = ", int(b))

# lst: list = [("name", "Alice"), ("age", 25), ("city", "New York")]
# d = dict(lst)       # skipped type hint to see what data type is assigned at runtime
# print(d, type(d))

fruits: list = ["apple", "banana", "cherry"]
fruits.extend(["orange", "grape"])

fruits.remove("orange")
fruits.pop(1)

# print(fruits[0:2]) 
print(fruits)