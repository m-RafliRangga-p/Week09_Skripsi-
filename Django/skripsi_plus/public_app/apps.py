from django.apps import AppConfig


class PublicAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'public_app'

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        import public_app.signals