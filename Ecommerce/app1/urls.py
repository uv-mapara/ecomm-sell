from django.urls import path
from .views import *
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('master/',master,name="master"),
    path('',home,name="home"), 

    path('register/',handle_register,name="register"), 
    path('register/SignupAuthentication/',signupAuthentication,name="SignupAuthentication"), 

    path('login/',handle_login,name="login"),
    path('logout/',handle_logout,name="logout"),
    path('forgot_password/',forgot_password,name="forgotpassword"),
    path('forgotOtp/',forgotOtp,name="forgotOtp"),
    path('newpassword/', newpassword,name='newpassword'),

    path('product/',product,name="product"), 
    path('add_to_wishlist/<int:pk>/',add_to_wishlist,name="add_to_wishlist"), 
    path('show_wishlist/',show_wishlist,name="showwishlist"), 
    path('delete_to_wishlist/<int:id>/',delete_to_wishlist,name="deletetowishlist"), 

    path('addtocart/<int:pk>/',add_to_cart,name="addtocart"),
    path('showmycart/',show_mycart,name="showmycart"),

    path('cart_update/<int:id>/',cart_update,name="cart_update"),
    path('cart_remove/<int:id>/',cart_remove,name="cart_remove"),
    path('deleteitem/<int:id>/',remove_items, name='deleteitem'),

    path('cart/checkout/',checkout,name="checkout"),       
    path('cart/checkout/success/',success,name="success"),

    path('tracking/',tracking,name="tracking"),    

    path('myaccount/',myaccount,name="myaccount"),    
         
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
