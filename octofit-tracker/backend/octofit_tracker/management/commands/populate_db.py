from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (Superheroes)
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
        ]

        # Create Activities
        activities = [
            Activity.objects.create(user=users[0], type='Run', duration=30, distance=5),
            Activity.objects.create(user=users[1], type='Swim', duration=45, distance=2),
            Activity.objects.create(user=users[2], type='Cycle', duration=60, distance=20),
            Activity.objects.create(user=users[3], type='Run', duration=25, distance=4),
        ]

        # Create Workouts
        workouts = [
            Workout.objects.create(name='Hero HIIT', description='High intensity workout for heroes'),
            Workout.objects.create(name='Power Lift', description='Strength training for super strength'),
        ]

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], points=100)
        Leaderboard.objects.create(user=users[1], points=90)
        Leaderboard.objects.create(user=users[2], points=95)
        Leaderboard.objects.create(user=users[3], points=85)

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with test data'))
