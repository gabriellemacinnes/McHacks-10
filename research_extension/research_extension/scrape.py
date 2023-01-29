import cgi, cgitb 
cgitb.enable() 

data = cgi.FieldStorage()
print(data)