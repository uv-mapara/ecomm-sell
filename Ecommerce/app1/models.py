from enum import unique
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
import datetime
import uuid

# Create your models here.

class Signup(models.Model):
    firstname=models.CharField( max_length=50)
    lastname=models.CharField( max_length=50)
    email=models.EmailField(max_length=254)
    phone=models.IntegerField(default='')
    password=models.CharField(max_length=50)
    confirmpassword=models.CharField(max_length=50,default='')    

    def __str__(self):
        return self.firstname

class Categories(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Subcategories(models.Model):
    categories = models.ForeignKey(Categories,on_delete=models.CASCADE,default='')
    name = models.CharField(max_length=200,default='')

    def __str__(self):
        return self.name

class Filter_Price(models.Model):
    Filter_Price = (
        ('100 TO 500','100 TO 500'),  
        ('500 TO 1000','500 TO 1000'),  
        ('1000 TO 10000','1000 TO 10000'),  
        ('10000 TO 20000','10000 TO 20000'),
        ('20000 TO 30000','20000 TO 30000'),
        ('30000 TO 40000','30000 TO 40000'),
        ('40000 TO 50000','40000 TO 50000'),
        ('50000 TO 60000','50000 TO 60000'),
        ('60000 TO 70000','60000 TO 70000'),
        ('70000 TO 80000','70000 TO 80000'),               
    )
    price=models.CharField(choices=Filter_Price,max_length=60)

    def __str__(self):
        return self.price

class Product(models.Model):   
    CONDITION=(('New','New'),('Old','Old'))
    STOCK=(('IN STOCK','IN STOCK'),('OUT OF STOCK','OUT OF STOCK'))
    STATUS=(('PUBLISH','PUBLISH'),('DRAFT','DRAFT'))

    categories=models.ForeignKey(Categories,on_delete=models.CASCADE)
    subcategories=models.ForeignKey(Subcategories,on_delete=models.CASCADE)  
    unique_id=models.CharField(unique=True,max_length=200,null=True,blank=True)     
    name=models.CharField(max_length=200)
    price = models.FloatField()         
    total_stock=models.PositiveIntegerField()
    image=models.ImageField(upload_to='product-img/')    
    description=RichTextField(null=True)
    created_date=models.DateTimeField(default=timezone.now)    

    condition=models.CharField(choices=CONDITION,max_length=100)
    stock=models.CharField(choices=STOCK,max_length=200)
    status=models.CharField(choices=STATUS,max_length=200)
    filter_price=models.ForeignKey(Filter_Price,on_delete=models.CASCADE)

    def save(self, *args , **kwargs):
        if self.unique_id is None and self.created_date and self.id:
            self.unique_id = self.created_date.strftime('75%Y%m%d23') + str(self.id)
        return super().save(*args,**kwargs)

    # def __str__(self):
    #     return self.name

    # def category(self):
    #     return "\n".join([c.name for c in self.categories.all()])

class Wishlist(models.Model):
    user=models.ForeignKey(Signup,null=True,blank=True, on_delete=models.CASCADE)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    
    def __str__(self):        
        return self.user.firstname

class Mycart(models.Model):
    user=models.ForeignKey(Signup,null=True,blank=True, on_delete=models.CASCADE)    
    product=models.ForeignKey(Product, on_delete=models.CASCADE) 
    quantity=models.PositiveIntegerField()   
    status=models.BooleanField(default=False)
    added_on = models.DateTimeField(auto_now_add=True,null=True)
    update_on= models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):        
        return self.user.firstname

Track = (
        ('Pending','Pending'),  
        ('Shipped','Shipped'),  
        ('Delivered','Delivered'),                         
    )
class Order(models.Model):
    unique_id= models.CharField(max_length=200,blank=False,null=False) 
    user=models.ForeignKey(Signup,on_delete=models.CASCADE)    
    firstname=models.CharField(max_length=100)
    lastname=models.CharField(max_length=100)
    country=models.CharField(max_length=100)
    address=models.TextField()
    city=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    postcode=models.IntegerField()
    phone=models.IntegerField()
    email=models.EmailField(max_length=100)
    # description=models.TextField()
    amount=models.CharField(max_length=100)
    payment_id=models.CharField(max_length=300,null=True,blank=True)
    paid=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)
    track = models.CharField(choices=Track,default='Pending',max_length=200)

    def __str__(self):
        return self.user.firstname

class OrderItems(models.Model):
    user=models.ForeignKey(Signup,on_delete=models.CASCADE,null=True)
    order=models.ForeignKey(Order,on_delete=models.CASCADE)      
    product=models.CharField(max_length=200)
    image=models.ImageField(upload_to='media/Order_img')
    quantity=models.CharField(max_length=20)
    price=models.CharField(max_length=50)
    total=models.CharField(max_length=1000)

    def __str__(self):
        return self.order.user.firstname

