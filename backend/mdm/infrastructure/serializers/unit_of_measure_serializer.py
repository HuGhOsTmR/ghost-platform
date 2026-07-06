from rest_framework import serializers

from mdm.models import UnitOfMeasure


class UnitOfMeasureSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = UnitOfMeasure

        fields = '__all__'