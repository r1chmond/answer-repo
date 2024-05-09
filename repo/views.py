from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

class SolutionView(viewsets.ModelViewSet):
    serializer_class = SolutionSerializer
    queryset = Solution.objects.all()


