from rest_framework.routers import DefaultRouter

from .company_viewset import CompanyViewSet
from .branch_viewset import BranchViewSet
from .role_viewset import RoleViewSet
from .user_profile_viewset import UserProfileViewSet

router = DefaultRouter()

router.register(
    r'companies',
    CompanyViewSet,
    basename='companies'
)
router.register(
    r'branches',
    BranchViewSet,
    basename='branches'
)
router.register(
    r'roles',
    RoleViewSet,
    basename='roles'
)
router.register(
    r'users',
    UserProfileViewSet,
    basename='users'
)

urlpatterns = router.urls