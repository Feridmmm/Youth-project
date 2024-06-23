# base/management/commands/load_data.py

import json
import os
from django.core.management.base import BaseCommand
from base.models import School, Kindergarten, SocialChildProject, SocialTeenagerProject

class Command(BaseCommand):
    help = 'Load data from JSON files into the database'

    def handle(self, *args, **kwargs):
        self.load_schools()
        self.load_kindergartens()
        self.load_social_child_projects()
        self.load_social_teenager_projects()

    def load_schools(self):
        file_path = os.path.join(os.path.dirname(__file__), '../../../data/schools.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                School.objects.create(
                    name=item['name'],
                    address=item['address'],
                    phone=item['phone'],
                    postal_code=item['postal_code'],
                    lat=item['lat'],
                    lon=item['lon']
                )

    def load_kindergartens(self):
        file_path = os.path.join(os.path.dirname(__file__), '../../../data/kindergartens.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                Kindergarten.objects.create(
                    name=item['name'],
                    address=item['address'],
                    phone=item['phone'],
                    postal_code=item['postal_code'],
                    lat=item['lat'],
                    lon=item['lon']
                )

    def load_social_child_projects(self):
        file_path = os.path.join(os.path.dirname(__file__), '../../../data/social_child_projects.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                SocialChildProject.objects.create(
                    name=item['name'],
                    address=item['address'],
                    phone=item['phone'],
                    postal_code=item['postal_code'],
                    lat=item['lat'],
                    lon=item['lon']
                )

    def load_social_teenager_projects(self):
        file_path = os.path.join(os.path.dirname(__file__), '../../../data/social_teenager_projects.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                SocialTeenagerProject.objects.create(
                    name=item['name'],
                    address=item['address'],
                    phone=item['phone'],
                    postal_code=item['postal_code'],
                    lat=item['lat'],
                    lon=item['lon']
                )
