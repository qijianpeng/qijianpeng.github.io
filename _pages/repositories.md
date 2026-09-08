---
layout: page
permalink: /repositories/
title: 代码库
description: 开源项目一览
nav: true
nav_order: 4
---

<a class="ee-entry" href="{{ '/repositories/edge-computing/' | relative_url }}">
  <span class="ee-entry-kicker">AWESOME EDGE COMPUTING · INTERACTIVE EXPLORER</span>
  <strong>边缘计算工具选型 <span aria-hidden="true">↗</span></strong>
  <span>按研究需求筛选仿真器、部署框架与 Edge AI 工具，查看能力依据，并排比较候选工具。</span>
  <span class="ee-entry-meta">{{ site.data.edge_catalog.inventory.entries.size }} 项资源 · 中英切换 · 数据更新 {{ site.data.edge_catalog.source.retrievedAt }}</span>
</a>

## GitHub users

{% if site.data.repositories.github_users %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

## GitHub Repositories

{% if site.data.repositories.github_repos %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
