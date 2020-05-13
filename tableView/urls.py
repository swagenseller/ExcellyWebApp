from django.urls import path

from . import views

urlpatterns = [
    path('api/petfood/', views.PetList.as_view() ),
    path('<pk>/delete/', views.DeleteView.as_view()),
    path('<pk>/put/', views.UpdateView.as_view()),
    path('add/', views.CreateView.as_view())
  #  path('getJson', views.modelToJson, name='modelToJson'),
  #  path('test/<str:extend>/', views.urlConfigTest, name='urlConfigTest'),
]