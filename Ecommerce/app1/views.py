from multiprocessing import context
from wsgiref.util import request_uri
from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.conf import settings
from django.core.mail import send_mail
from app1.models import *
from django.contrib import messages
from django.conf import settings
from django.http import JsonResponse
import razorpay
from django.views.decorators.csrf import csrf_exempt
import random

# Create your views here.
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID,settings.RAZORPAY_KEY_SECRET))

def master(request):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        all = Mycart.objects.filter(user_id=obj.id)
        l=[]                                     
        total=0
        for i in all:            
            l.append(i.product)              
            total=total + i.product.price                                 
        return render(request,'Master/master.html',{'al':l,'all':all,'total':total,'wishlist':wishlist})                            
    return render(request,'Master/master.html')    

def home(request):        
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        all = Mycart.objects.filter(user_id=obj.id)
        l=[]                                     
        total=0
        for i in all:            
            l.append(i.product)              
            total=total + i.product.price                           

        wishlist = Wishlist.objects.filter(user_id=obj.id)                         
        wish=[] 
        for i in wishlist:                       
            wish.append(i)

        categories = Categories.objects.all().order_by('name')    
    
        context = {
            'categories':categories,
            'al':l,
            'w':wish,
        }
        return render(request,'Master/home.html',context)  
    else:
        categories = Categories.objects.all().order_by('name') 
        context = {
            'categories':categories,                          
        }
    return render(request,'Master/home.html',context)    

sign=Signup()
def handle_register(request):
    if request.method=="POST":        
        sign.firstname=request.POST['firstname']
        sign.lastname=request.POST['lastname']
        sign.email=request.POST['email']
        sign.phone=request.POST['mobile']
        sign.password=request.POST['password']        
        sign.confirmpassword=request.POST['confirmpassword']        
       
        if Signup.objects.filter(email=sign.email).exists():            
            return JsonResponse({'opstatus':'Error'})
        else:                   
            otp = ''
            rand = random.choice('0123456789')
            rand1 = random.choice('0123456789')
            rand2 = random.choice('0123456789')
            rand3 = random.choice('0123456789')
            otp = rand + rand1 + rand2 + rand3 

            request.session['otp'] = otp                  
            subject = 'Email Verification'
            message = otp
            email_from= settings.EMAIL_HOST_USER
            recipient_list = [sign.email]
            send_mail( subject, message, email_from, recipient_list )                                             
            return JsonResponse({'opstatus':'Success'})
        
    return render(request,'Login/register.html')

def signupAuthentication(request):
    if request.session.has_key('otp'):
        otp = request.session['otp']        
        try:
            otpobj = request.POST.get('otp')                                  
            if otp == otpobj:
                sign.save()
                return redirect('login')                                                                
        except:            
            return redirect('SignupAuthentication')
    return render(request,'Login/SignupAuthentication.html')

def handle_login(request):
    if request.method=="POST":
        try:
            e=request.POST['email'] 
            request.session['email']=e            
            p=request.POST['password']                       
            x=Signup.objects.get(email=e)                         
            if x.password==p:
                # messages.success(request, f'you are now logged')
                return JsonResponse({'optstatus':'success'})
                # return redirect('home')
            else:
                messages.warning(request, 'Please input correct password')
                # return JsonResponse({'optstatus':'error'})
        except:
            messages.warning(request,'Enter Username And Password.')
    return render(request,'Login/login.html')

def forgot_password(request):         
    if request.method == 'POST':
        email = request.POST.get('email')
        request.session['forgot'] = email
        if Signup.objects.filter(email=email).exists():            
            otp = ''
            rand = random.choice('0123456789')
            rand1 = random.choice('0123456789')
            rand2 = random.choice('0123456789')
            rand3 = random.choice('0123456789')
            otp = rand + rand1 + rand2 + rand3                        
            request.session['otp'] = otp
                
            subject = 'Forgot Password'
            message = otp
            email_from= settings.EMAIL_HOST_USER
            recipient_list = [email]            
            send_mail( subject, message, email_from, recipient_list )
            return JsonResponse({'optstatus':'Success'})
        else:
            return JsonResponse({'opstatus':'Error'})   
    return render(request,'Login/forgot.html')

def forgotOtp(request):
    e = request.session['forgot']   
    if request.session.has_key('otp'):
        otp = request.session['otp'] 
        print(otp)             
        if request.method == 'POST':                                               
            if otp == request.POST.get('otp'):
                del request.session['otp']
                return JsonResponse({'optstatus':'Success'})
            else:
                return JsonResponse({'optstatus':'Wrong'})
    return render(request,'Login/forgotOtp.html')

def newpassword(request):
    if request.session.has_key('forgot'):
        e = request.session['forgot']             
        if request.method == "POST":                
            new_pass = request.POST.get('newpassword')   
            print(new_pass)                
            obj = Signup.objects.get(email = e)      
            print(obj.email)      
            obj.password = new_pass
            obj.confirmpassword = new_pass
            obj.save()
            del request.session['forgot']
            return JsonResponse({'optstatus':'Success'})
    else:
        return JsonResponse({'optstatus':'SecondTime'})
    return render(request,'Login/newpassword.html')    

def handle_logout(request):
    if request.session.has_key('email'):
        del request.session['email']
        return redirect('/')

def product(request):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        all = Mycart.objects.filter(user_id=obj.id)
        l=[]                                     
        total=0
        for i in all:            
            l.append(i.product)              
            total=total + i.product.price 

        wishlist = Wishlist.objects.filter(user_id=obj.id)                         
        wish=[] 
        wish2=[]          
        for i in wishlist:                    
            wish.append(i)     
            wish2.append(i.product.pk)                                    

        categories = Categories.objects.all().order_by('name')    
        filter_price=Filter_Price.objects.all().order_by('price')

        categoryID=request.GET.get('subcategory')
        filterID=request.GET.get('filter_price')
        filterID=request.GET.get('filter_price')
        ATOZ_ID=request.GET.get('ATOZ')
        ZTOA_ID=request.GET.get('ZTOA')
        LowTOHigh_ID=request.GET.get('LowTOHigh')
        HightToLow_ID=request.GET.get('HightToLow')
        New_ID=request.GET.get('New')
        Old_ID=request.GET.get('Old')

        Search_Id=request.GET.get('search')

        if categoryID:
            product=Product.objects.filter( subcategories = categoryID , status = 'PUBLISH')            

        elif filterID:
            product=Product.objects.filter( filter_price = filterID , status = 'PUBLISH')
    
        elif ATOZ_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('name')

        elif ZTOA_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-name')
        
        elif LowTOHigh_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('price')

        elif HightToLow_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-price')

        elif New_ID:
            product=Product.objects.filter( status = 'PUBLISH',condition = 'New' )

        elif Old_ID:
            product=Product.objects.filter( status = 'PUBLISH',condition = 'Old' )        

        elif Search_Id:                                        
            product=Product.objects.filter( status = 'PUBLISH' , name__icontains=Search_Id) 
            if not product:                
                messages.warning(request, 'Search Not Found')                          

        else:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-id') 
        
        context = {
            'categories':categories,
            'product':product,  
            'filter_price':filter_price,
            'al':l, 
            'w':wish,
            'w2':wish2,
        }
        return render(request,'Master/product.html',context)
    else:
        categories = Categories.objects.all().order_by('name')    
        filter_price=Filter_Price.objects.all().order_by('price')

        categoryID = request.GET.get('subcategory')
        filterID=request.GET.get('filter_price')
        filterID=request.GET.get('filter_price')
        ATOZ_ID=request.GET.get('ATOZ')
        ZTOA_ID=request.GET.get('ZTOA')
        LowTOHigh_ID=request.GET.get('LowTOHigh')
        HightToLow_ID=request.GET.get('HightToLow')
        New_ID=request.GET.get('New')
        Old_ID=request.GET.get('Old')

        Search_Id=request.GET.get('search')

        if categoryID:
            product=Product.objects.filter( subcategories = categoryID , status = 'PUBLISH')            

        elif filterID:
            product=Product.objects.filter( filter_price = filterID , status = 'PUBLISH')
    
        elif ATOZ_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('name')

        elif ZTOA_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-name')
        
        elif LowTOHigh_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('price')

        elif HightToLow_ID:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-price')

        elif New_ID:
            product=Product.objects.filter( status = 'PUBLISH',condition = 'New' )

        elif Old_ID:
            product=Product.objects.filter( status = 'PUBLISH',condition = 'Old' )        
        elif Search_Id:                                        
            product=Product.objects.filter( status = 'PUBLISH' , name__icontains=Search_Id) 
            if not product:                
                messages.warning(request, 'Search Not Found')                          

        else:
            product=Product.objects.filter( status = 'PUBLISH' ).order_by('-id') 
        
        context = {
            'categories':categories,
            'product':product,  
            'filter_price':filter_price,                              
        }
        return render(request,'Master/product.html',context)

def add_to_wishlist(request,pk):
    if request.session.has_key('email'):
        per = Signup.objects.get(email=request.session['email'])
        p = get_object_or_404(Product, pk=pk)        
        if request.method == 'POST':
            if Wishlist.objects.filter(product__id=p.id, user__id=per.id).exists():
                messages.warning(request, 'This item is already in the cart')
                return redirect('product')
            else:
                wishlist=Wishlist()                                
                wishlist.user=per
                wishlist.product=p                
                wishlist.save()  
                return JsonResponse({'optstatus':'success'})                              
        return render(request, 'cart/wishlist.html')
    else:
        return redirect('login')
    
def show_wishlist(request):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        all = Wishlist.objects.filter(user_id=obj.id)                         
        wish=[] 
        for i in all: 
            print(i.product.id)           
            wish.append(i) 
        
        cart = Mycart.objects.filter(user_id=obj.id)
        l=[]                                     
        total=0
        for i in cart:            
            l.append(i.product)              
            total=total + i.product.price 
                                                           
        return render(request,'cart/wishlist.html',{'al':l,'w':wish,'all':all,'n':obj})
    else:
        return redirect('login')
    
def delete_to_wishlist(request,id):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        y=Wishlist.objects.get(product__id=id,user__id=obj.id)                        
        y.delete()
        return JsonResponse({'optstatus':'success'}) 


def add_to_cart(request,pk):
    if request.session.has_key('email'):
        per = Signup.objects.get(email=request.session['email'])
        p = get_object_or_404(Product, pk=pk)             
        if request.method == 'POST':             
            if Mycart.objects.filter(product__id=p.pk, user__id=per.pk,status=False).exists():
                messages.warning(request, 'This item is already in the cart')
                return JsonResponse({'optstatus':'exists'})
                # return redirect('product')
            else:
                quantity = request.POST.get('quantity')
                cart=Mycart()                                                 
                cart.user=per
                cart.product=p 
                cart.quantity = quantity
                cart.save()
                return JsonResponse({'optstatus':'added'})           
        return render(request, 'Master/product.html', {'p': p, 'per': per})
    else:
        return redirect('login')                     
        

def show_mycart(request):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        all = Mycart.objects.filter(user_id=obj.id)                         
        l=[]                                                    
        total=0
        for i in all:            
            l.append(i)                                     
            total=total + i.product.price * i.quantity    
            
        wishlist = Wishlist.objects.filter(user_id=obj.id)                         
        wish=[] 
        for i in wishlist:                       
            wish.append(i)
        return render(request,'cart/cart_detail.html',{'w':wish,'al':l,'all':all,'n':obj,'total':total})
    else:
        return redirect('login')     

def cart_update(request, id):
    if request.session.has_key('email'): 
        user=Signup.objects.get(email=request.session['email'])       
        # product=get_object_or_404(Product,id=id)
        cart=Mycart.objects.get(id=id,user__id=user.id)        

        if cart.quantity < cart.product.total_stock:        
            cart.quantity += 1                        
            cart.save()
            return redirect('showmycart')
        else:
            messages.warning(request, f'Not available {cart.product.total_stock+1} Product')
            return redirect('showmycart')   
      

def cart_remove(request, id):
    if request.session.has_key('email'): 
        user=Signup.objects.get(email=request.session['email'])       
        # product=get_object_or_404(Product,id=id)
        cart=Mycart.objects.get(id=id,user__id=user.id)

        if cart.quantity == 1:
            return redirect('showmycart')

        elif cart.quantity <= cart.product.total_stock:        
            cart.quantity -= 1             
            cart.save()
            return redirect('showmycart')       

def remove_items(request,id):
    if request.session.has_key('email'):
        obj = Signup.objects.get(email=request.session['email'])
        y=Mycart.objects.get(id=id,user__id=obj.id)                        
        y.delete()
        return redirect('showmycart')    

def checkout(request):
    if request.session.has_key('email'):        
        form = Signup.objects.get(email=request.session['email']) 
        all = Mycart.objects.filter(user=form.id)                         
        l=[]                                                    
        total=0
        for i in all:            
            l.append(i)                                     
            total=total + i.product.price * i.quantity                       

        payment = client.order.create({
            'amount':total*100,
            'currency':'INR',
            'payment_capture':'1',
        })        

        order_id=payment['id']   

        if request.method == 'POST': 
            order_unique_id = ''
            rand = random.choice('0123456789')
            rand1 = random.choice('0123456789')
            rand2 = random.choice('0123456789')
            rand3 = random.choice('0123456789')
            rand4 = random.choice('0123456789')
            rand5 = random.choice('0123456789')
            order_unique_id = rand + rand1 + rand2 + rand3 + rand4 + rand5

            order=Order()
            order.unique_id = order_unique_id
            order.user=form
            order.firstname = request.POST['firstname']            
            order.lastname = request.POST['lastname']
            order.country = request.POST['country']
            order.address = request.POST['address']
            order.city = request.POST['city']
            order.state = request.POST['state']
            order.postcode = request.POST['postcode']
            order.phone = request.POST['phone']
            order.email = request.POST['email']            
            order.amount = request.POST['amount'] 
            order.payment_id = request.POST['order_id']  
            order.paid = True
            order.save() 

            payment=request.POST['payment']            
            order_id=request.POST.get('order_id')  
            print(order_id)                      

            all = Mycart.objects.filter(user_id=form.id) 
            # form = Signup.objects.get(email=request.session['email'])                          
            l=[]                  
            total=0
            for i in all:            
                l.append(i)                                                
                total=total + i.product.price * i.quantity                                                                                    

                orderItem=OrderItems()
                orderItem.user=form            
                orderItem.order=order
                #orderitem.unique_id=order.payment_id
                orderItem.unique_id=order_unique_id
                orderItem.product=i.product.name
                orderItem.image=i.product.image
                orderItem.quantity=i.quantity
                orderItem.price=i.product.price  
                orderItem.total=i.product.price * i.quantity
                orderItem.save()
                i.delete()     
            return JsonResponse({'optstatus':'Success'})                

        context={
            'al':l,'all':all,'total':total,'form':form, 
            'order_id':order_id,'payment':payment                  
        }

    return render(request,'cart/checkout.html',context)

@csrf_exempt
def success(request):               
    return render(request,'cart/success.html')

def tracking(request):    
    if request.method == 'POST':
        orderId = request.POST.get('trackNo')        
        t = Order.objects.get(unique_id = orderId)     
        return JsonResponse({'optstatus':'success','optstatus1':t.track})               
    return render(request,'cart/tracking.html')    

def myaccount(request):
    if request.session.has_key('email'):
        user=Signup.objects.get(email=request.session['email'])
        order=OrderItems.objects.filter(user__id=user.id)  

        all = Mycart.objects.filter(user=user.id)                         
        l=[]                                                            
        for i in all:            
            l.append(i)                                                 

        wishlist = Wishlist.objects.filter(user_id=user.id)                         
        wish=[] 
        for i in wishlist:                       
            wish.append(i)

        context={
            'order':order,
            'w':wish,
            'al':l,
        }
        return render(request,'MyAccount/myaccount.html',context) 
    else:
        return redirect('login')
    #return render(request,'MyAccount/myaccount.html')
                                



        

         
