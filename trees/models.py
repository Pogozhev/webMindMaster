
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Tree(models.Model):
    name = models.CharField(max_length=255, default="New tree")
    file = models.CharField(max_length=1000000, default='{ "nodes": [ { "id": "book", "name": "Book", "type": "table", "columns": [ { "id": "id", "datatype": "integer", "primaryKey": true }, { "id": "isbn", "datatype": "varchar" }, { "id": "title", "datatype": "varchar" } ] }, { "id": "book_author", "name": "BookAuthor", "type": "table", "columns": [ { "id": "book_id", "datatype": "integer" }, { "id": "author_id", "datatype": "integer" } ] }, { "id": "author", "name": "Author", "type": "table", "columns": [ { "id": "id", "datatype": "integer", "primaryKey": true }, { "id": "name", "datatype": "varchar" } ] }, { "id": "publisher", "name": "Publisher", "type": "table", "columns": [ { "id": "id", "datatype": "integer", "primaryKey": true }, { "id": "name", "datatype": "varchar" } ] }, { "id": "book_publisher", "name": "BookPublisher", "type": "table", "columns": [ { "id": "book_id", "datatype": "integer" }, { "id": "publisher_id", "datatype": "integer" } ] } ], "edges": [ { "source": "book", "target": "book_author", "data": { "type": "common" } }, { "source": "book_author", "target": "author", "data": { "type": "1:1" } }, { "source": "book", "target": "book_publisher", "data": { "type": "1:1" } }, { "source": "book_publisher", "target": "publisher", "data": { "type": "1:1" } } ] }')
    create_date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User)
    def __str__(self):
        return '{}, {:%Y-%m-%d}, {}'.format(self.name, self.create_date, self.user)
