FROM ruby:3.2.2
RUN apt-get update && apt-get install -y --no-install-recommends imagemagick libwebp-dev python3-venv && rm -rf /var/lib/apt/lists/*
RUN gem install bundler -v 2.5.7
WORKDIR /site
COPY Gemfile Gemfile.lock ./
RUN bundle install
RUN python3 -m venv /opt/jupyter && /opt/jupyter/bin/pip install --no-cache-dir jupyter
ENV PATH="/opt/jupyter/bin:${PATH}"
