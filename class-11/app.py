sort_num : list = [2, 3,6,4,9,7,8,1,5]

#! Ascending Order 

# print("Before sorting: ", sort_num)

# sort_num.sort()
# print("After sorting: ", sort_num)

#! Descending Order

# print("Before sorting: ", sort_num)

# sort_num.sort(reverse=True)
# print("After sorting: ", sort_num)


# words = ["apple", "kiwi", "banana"]
# words.sort(key=len)
# print(words)  


# numbers: list = [1, 2,3 , 4,5 ,6]
# fruits : list = ["apple", "banana", "cherry", "date", "elderberry"]

# fruits.reverse()

# print(fruits)



# for fruit in fruits:
#     print(fruit)

# fruits: tuple = ("apple", "banana", "cherry", "date", "elderberry")
# print(fruits[0])  # Output: apple


# fruits: tuple = tuple(["apple", "banana", "cherry", "date", "elderberry"])

# print(fruits)  # Output: <class 'tuple'>

tuple_1: tuple = (10, 20, 30) # tuple
# tuple_2: tuple = (10, 20, 30) # tuple

# print("id(tuple_1) = ", id(tuple_1)) # unique memory address
# print("id(tuple_2) = ", id(tuple_2)) # unique memory address

# print("tuple_1 == tuple_2 = ", tuple_1 == tuple_2) 
# print("tuple_1 is tuple_2 = ", tuple_1 is tuple_2)


# a, b, c = tuple_1
# print("Unpacking tuple1:", a, b, c)

# person: dict = {
#     "name": "John Doe",
#     "age": 30,
#     "city": "New York",
#     "cnic": "12345-6789012-3"
# }


# person["name"] = "Ali"

# del person["name"]

# age = person.pop("age", -1)

# # print(person["name"])  # Output: John Doe
# print("Age:", age)  # Output: Age: 30
# print("Person dictionary:", person)  # Output: Person dictionary: {'name': 'John Doe', 'city': 'New York'}


person: dict = {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "cnic": "12345-6789012-3",
    
    "timings": {
        "morning": "8:00 AM - 12:00 PM",
        "afternoon": "1:00 PM - 5:00 PM",
        "evening": "6:00 PM - 10:00 PM"
    }
}

# print("Person dictionary keys:", person.keys())  
# print("Person dictionary values:", person.values())
# print("Person dictionary items:", person.items())


person.update({"age": 31, "country": "USA"})
# print("Person dictionary update:", person)

# person.clear()
# print("Person dictionary after clear:", person)

# for key in person:
#     print(key)

# for key, value in person.items():
#     print(f"{key}: {value}")

# print(person.get("name", ":)"))


# print(person["timings"]["afternoon"])


#! =========================== SET ===========================

# set_1: set = {1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10}

# random_num: list = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 7,11, 13, 12, 14, 15]


# set_1: set = set(random_num)

# # set_1: set = set([1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10])

# print(set_1) 
# print(type(set_1))  # Output: <class 'set'>


my_set: set = {1, 2, 3, 4, 5}

my_set.discard(5)
print(my_set)

# print(my_set)  # Output: {1, 2, 3, 4, 5}

# # Try to change an item (this will raise an error)
# try:
#     my_set[0] = 10  # Sets are unordered, so indexing doesn't work
# except TypeError as e:
#     print(e) 


    
    
print("HI !!!!")