from rest_framework import serializers
from .models import Pet_Food

class Pet_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Pet_Food
        fields = ('id', 'name', 'brand', 'pet', 'price')

#class GroupSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = Pet
#        fields = ['url', 'id']
