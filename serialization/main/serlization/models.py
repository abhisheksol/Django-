from django.db import models

# Create your models here.
class Mobile(models.Model):
    # foreign key to user model
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='mobiles')
    # fields for mobile model
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ram = models.IntegerField()
    storage = models.IntegerField()
    camera = models.CharField(max_length=100)
    battery = models.IntegerField()
    processor = models.CharField(max_length=100)
    image_url = models.URLField(max_length=200, blank=True, null=True)  # Optional field for image URL

    def __str__(self):
        return self.name