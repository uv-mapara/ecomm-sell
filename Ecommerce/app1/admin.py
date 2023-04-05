from django.contrib import admin
from .models import *

class OrderItemsTabularinline(admin.TabularInline):
    model= OrderItems

class OrderAdmin(admin.ModelAdmin):
    inlines=[OrderItemsTabularinline]
    list_display = ('firstname','phone','email','payment_id','paid','date')
    search_fields = ('firstname', 'phone','payment_id')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','categories','image','price')
    list_editable = ('price',)     

class CartAdmin(admin.ModelAdmin):
    list_display = ('user','added_on')        
    list_filter = ('added_on',)
    list_per_page = 10
    search_fields = ('user', 'product')
    
# Register your models here.

admin.site.register(Signup)
admin.site.register(Categories)
admin.site.register(Subcategories)
admin.site.register(Filter_Price)
admin.site.register(Product,ProductAdmin)
admin.site.register(Mycart,CartAdmin)
admin.site.register(Order,OrderAdmin)
admin.site.register(OrderItems)
admin.site.register(Wishlist)
