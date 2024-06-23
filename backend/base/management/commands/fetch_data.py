import requests
from django.core.management.base import BaseCommand
from base.models import School, Kindergarten, SocialChildProject, SocialTeenagerProject

class Command(BaseCommand):
    help = 'Fetch data from external sources and save to database'

    def handle(self, *args, **kwargs):
        urls = {
            'schools': 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
            'kindergartens': 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
            'social_child_projects': 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
            'social_teenager_projects': 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
        }

        for category, url in urls.items():
            response = requests.get(url)
            data = response.json()

            if 'features' not in data:
                self.stdout.write(self.style.ERROR(f'No features found in {category} data'))
                continue

            if category == 'schools':
                School.objects.all().delete()
                for feature in data['features']:
                    properties = feature['properties']
                    School.objects.create(
                        name=properties.get('NAME', 'N/A'),
                        address=properties.get('STRASSE', 'N/A'),
                        phone=properties.get('TELEFON', 'N/A') if properties.get('TELEFON') else 'No phone',
                        postal_code=properties.get('PLZ', 'N/A'),
                        lat=feature['geometry']['coordinates'][1],
                        lon=feature['geometry']['coordinates'][0]
                    )
            elif category == 'kindergartens':
                Kindergarten.objects.all().delete()
                for feature in data['features']:
                    properties = feature['properties']
                    Kindergarten.objects.create(
                        name=properties.get('NAME', 'N/A'),
                        address=properties.get('STRASSE', 'N/A'),
                        phone=properties.get('TELEFON', 'N/A') if properties.get('TELEFON') else 'No phone',
                        postal_code=properties.get('PLZ', 'N/A'),
                        lat=feature['geometry']['coordinates'][1],
                        lon=feature['geometry']['coordinates'][0]
                    )
            elif category == 'social_child_projects':
                SocialChildProject.objects.all().delete()
                for feature in data['features']:
                    properties = feature['properties']
                    SocialChildProject.objects.create(
                        name=properties.get('NAME', 'N/A'),
                        address=properties.get('STRASSE', 'N/A'),
                        phone=properties.get('TELEFON', 'N/A') if properties.get('TELEFON') else 'No phone',
                        postal_code=properties.get('PLZ', 'N/A'),
                        lat=feature['geometry']['coordinates'][1],
                        lon=feature['geometry']['coordinates'][0]
                    )
            elif category == 'social_teenager_projects':
                SocialTeenagerProject.objects.all().delete()
                for feature in data['features']:
                    properties = feature['properties']
                    SocialTeenagerProject.objects.create(
                        name=properties.get('NAME', 'N/A'),
                        address=properties.get('STRASSE', 'N/A'),
                        phone=properties.get('TELEFON', 'N/A') if properties.get('TELEFON') else 'No phone',
                        postal_code=properties.get('PLZ', 'N/A'),
                        lat=feature['geometry']['coordinates'][1],
                        lon=feature['geometry']['coordinates'][0]
                    )

        self.stdout.write(self.style.SUCCESS('Data fetched and saved to database'))
