import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Main.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # traditional HTTP
    "websocket": AuthMiddlewareStack(  # for WebSocket
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
