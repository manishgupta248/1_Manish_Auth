# Generated by Django 5.1.6 on 2025-02-25 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('COURSE_NAME', models.CharField(max_length=255)),
                ('COURSE_CODE', models.CharField(max_length=10, unique=True)),
                ('CATEGORY', models.CharField(choices=[('Credits', 'Credits'), ('CBCS', 'CBCS')], max_length=10)),
                ('COURSE_CATEGORY', models.CharField(choices=[('COMPULSORY', 'Compulsory'), ('ELECTIVE', 'Elective')], max_length=10)),
                ('TYPE', models.CharField(choices=[('DISSERTATION', 'Dissertation'), ('LABORATORY', 'Laboratory'), ('PRACTICAL', 'Practical'), ('PROJECT', 'Project'), ('THEORY', 'Theory'), ('THEORY_AND_PRACTICAL', 'Theory and Practical'), ('TUTORIAL', 'Tutorial')], max_length=20)),
                ('CREDIT_SCHEME', models.CharField(choices=[('CREDIT', 'Credit'), ('CBCS', 'CBCS'), ('NEP', 'NEP')], max_length=10)),
                ('CBCS_CATEGORY', models.CharField(choices=[('MAJOR', 'Major'), ('MINOR', 'Minor'), ('CORE', 'Core'), ('DSE', 'DSE'), ('GE', 'GE'), ('OE', 'OE'), ('VAC', 'VAC'), ('AECC', 'AECC'), ('SEC', 'SEC'), ('MDC', 'MDC'), ('IDC', 'IDC')], max_length=5)),
                ('DISCIPLINE', models.CharField(max_length=255)),
                ('MAXIMUM_CREDIT', models.IntegerField(default=0)),
                ('QUALIFYING_IN_NATURE', models.CharField(choices=[('YES', 'Yes'), ('NO', 'No')], max_length=3)),
            ],
        ),
    ]
