from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create_user(username="testuser", email="test@example.com", password="pass", team=team)
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.team.name, "Test Team")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create_user(username="testuser2", email="test2@example.com", password="pass", team=team)
        activity = Activity.objects.create(user=user, type="run", duration=30, distance=5.0)
        self.assertEqual(activity.type, "run")
        self.assertEqual(activity.duration, 30)
        self.assertEqual(activity.distance, 5.0)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Cardio", description="Cardio workout")
        self.assertEqual(workout.name, "Cardio")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create_user(username="testuser3", email="test3@example.com", password="pass", team=team)
        leaderboard = Leaderboard.objects.create(user=user, points=100)
        self.assertEqual(leaderboard.points, 100)
