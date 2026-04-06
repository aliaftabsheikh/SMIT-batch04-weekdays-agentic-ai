# def calculator():
#   """
#   A calculator function that takes user input for numbers and operations,
#   including modulus, floor division, and exponentiation.
#   """
#   while True:
#     operation = input("Enter the operation (+, -, *, /, %, //, ** or 'q' to quit): ")
#     if operation.lower() == 'q':
#       break
#     if operation not in ('+', '-', '*', '/', '%', '//', '**'):
#       print("Invalid operation.")
#       continue

#     try:
#       num1 = float(input("Enter the first number: "))
#       num2 = float(input("Enter the second number: "))
#     except ValueError:
#       print("Invalid input. Please enter numbers only.")
#       continue

#     if operation == '+':
#       result = num1 + num2
#     elif operation == '-':
#       result = num1 - num2
#     elif operation == '*':
#       result = num1 * num2
#     elif operation == '/':
#       if num2 != 0:
#         result = num1 / num2
#       else:
#         result = "Error: Division by zero."
#         print(result)
#         continue
#     elif operation == '%':
#       result = num1 % num2
#     elif operation == '//':
#       if num2 != 0:
#         result = num1 // num2
#       else:
#         result = "Error: Division by zero."
#         print(result)
#         continue
#     elif operation == '**':
#       result = num1 ** num2

#     print("Result:", result)

# calculator()


# print("Hello, \"World\"!") 
# print("Hello, \\ World!") 

text:str = "Hello, World!"
# print(text[7:])
print(text.upper())
print(text.lower())
print(text.capitalize())
