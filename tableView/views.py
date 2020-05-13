from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Pet_Food
from .serializers import Pet_Serializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



class PetList(generics.ListCreateAPIView):
    queryset = Pet_Food.objects.all()
    serializer_class = Pet_Serializer

class DeleteView(generics.DestroyAPIView):
    queryset = Pet_Food.objects.all()
    serializer_class = Pet_Serializer

class UpdateView(generics.UpdateAPIView):
    queryset = Pet_Food.objects.all()
    serializer_class = Pet_Serializer

class CreateView(generics.CreateAPIView):
    queryset = Pet_Food.objects.all()
    serializer_class = Pet_Serializer

# test code 
@api_view(['GET', 'POST'])
def customers_list(request):
    """
 List  customers, or create a new customer.
 """
    if request.method == 'POST':
        serializer = Pet_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail(request, pk):
        # """
        # Retrieve, update or delete a customer by id/pk.
        # """
    try:
        pet_food = Pet_Food.objects.get(pk=pk)
    except Pet_Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = Pet_Serializer(pet_food,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = Pet_Serializer(pet_food, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pet_food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

