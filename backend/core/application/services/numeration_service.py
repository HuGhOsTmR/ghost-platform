from django.db import transaction

from core.models import Numeration


class NumerationService:

    @staticmethod
    @transaction.atomic
    def get_next_number(
        company,
        document_type,
        fiscal_year
    ):

        numeration = Numeration.objects.select_for_update().get(
            company=company,
            document_type=document_type,
            fiscal_year=fiscal_year,
            is_active=True
        )

        numeration.current_number += 1

        numeration.save()

        sequence = str(
            numeration.current_number
        ).zfill(
            numeration.padding
        )

        return (
            f"{company.code}"
            f"{numeration.separator}"
            f"{numeration.prefix}"
            f"{numeration.separator}"
            f"{fiscal_year}"
            f"{numeration.separator}"
            f"{sequence}"
        )