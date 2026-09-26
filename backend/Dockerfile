FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies for GeoDjango (GDAL, GEOS, PROJ) and PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy the entire build context into a temporary directory
COPY . /tmp_build/

# Move the relevant files to /app
# If built from root, backend files are in /tmp_build/backend/
# If built from backend, files are directly in /tmp_build/
RUN if [ -d "/tmp_build/backend" ]; then \
        mv /tmp_build/backend/* /app/ || true; \
    else \
        mv /tmp_build/* /app/ || true; \
    fi && rm -rf /tmp_build

# Now install dependencies (it will definitely be at /app/requirements.txt now)
RUN pip install --upgrade pip && pip install -r requirements.txt


# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port (default 8000 for local docker)
EXPOSE 8000

# Command to run the application using Render's PORT or default to 8000
CMD ["sh", "-c", "python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]
