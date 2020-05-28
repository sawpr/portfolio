<template>
  <main class="main">
    <section id="hero" class="hero">
      <!-- hero -->
    </section>
    <section id="about" class="section">
      <div class="inner">
        <h2 class="section__ttl">About</h2>
        <dl class="section__dl">
          <dt class="section__dt">Profile</dt>
          <dd class="section__dd">
            <figure class="avatar">
              <img
                src="~/assets/img/profile.jpg"
                width="150"
                alt=""
                class="avatar__img"
              />
              <figcaption>saw_pr</figcaption>
            </figure>
          </dd>
        </dl>
        <nav>
          <ul class="output">
            <li class="output__list"><nuxt-link to="https://github.com/sawpr/portfolio"><i class="fab fa-github"></i></nuxt-link></li>
          </ul>
        </nav>
        <dl class="section__dl">
          <dt class="section__dt">Skill</dt>
          <dd class="section__dd">
            <p>HTML5 / CSS3</p>
            <p>Scss / Sass</p>
            <p>JavaScript / jQuery</p>
            <p>WordPress</p>
            <p>Photoshop<br>(none design)</p>
          </dd>
        </dl>
        <dl class="section__dl">
          <dt class="section__dt">Tools</dt>
          <dd class="section__dd">
            <p>VScode</p>
            <p>Gulp<br>( Pug / Scss / Imagemin / browser-sync / Webpack )</p>
            <p>Git<br>( CLI / SourceTree )</p>
            <p>VirtualBox / Vagrant<br>( LAMP : PHP )</p>
            <p>Photoshop / XD</p>
            <p>Backlog</p>
            <p>GitHub</p>
          </dd>
        </dl>
      </div>
    </section>
    <section class="section" id="works">
      <div class="inner">
        <h2 class="section__ttl">Works</h2>
        <div class="flex-box">
          <template v-if="items.totalCount = 1">
            <template v-for="item in items.contents">
              <div class="works__content" v-bind:class="{ active: itemCount }">
                <figure class="works__thumb">
                  <img :src="item.thumbnail.url" :alt="item.title" />
                </figure>
                <dl class="works__dl">
                  <dt class="works__dt">{{ item.title }}</dt>
                  <dd class="works__dd">
                    <p class="works__text">{{ item.subtitle }}</p>
                    <p class="works__text">担当：{{ item.handle }}</p>
                    <p class="works__text intro">{{ item.introduction }}</p>
                    <p class="works__text muted">{{ item.technical }}</p>
                    <p class="works__text muted">作業時間：{{ item.span }}</p>
                    <template v-if="item.link">
                      <p class="works__text link">
                        <a :href="item.link" target="_blank" class="btn--green">Link {{ item.link }}</a>
                      </p>
                    </template>
                  </dd>
                </dl>
              </div>
            </template>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: [],
      itemCount: false
    }
  },
  async asyncData() {
    const { data } = await axios.get(
      'https://port-nuxt.microcms.io/api/v1/portfolio',
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    )
    return {
      items: data
    }
  },
  mounted() {
    {
      document.getElementsByClassName('main')[0].style.marginTop = document.getElementsByClassName('header')[0].clientHeight + 'px' // mainコンテンツ内マージン調整
    }
    {
      if(this.items.totalCount = 1) {
        const target = document.getElementsByClassName('works__content')
        target[0].style.margin = '0 auto'
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/main';
.main {
  padding: 30px 0;
}
.hero {
  background: yellow;
}
.section {
  padding: 30px 0;
  text-align: center;
  &__ttl {
    font-size: $font-size;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__dl {
    font-size: $font-size - .5rem;
  }
  &__dt {
    border-bottom: 1px dashed #555;
    display: inline;
    line-height: 50px;
    margin-bottom: 15px;
    padding: 0 0 5px;
  }
  &__dd {
    margin-bottom: 30px;
    p {
      line-height: 50px;
    }
  }
  .inner {
    padding: 0 5%;
  }
  .flex-box {
    @include mq(pc) {
      display: flex;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }
  }
  .avatar {
    &__img {
      border: 5px solid #333;
      border-radius: 50%;
      padding: 2px;
    }
  }
  .output {
    margin-bottom: 30px;
    &__list {
      .fab {
        color: #333;
        font-size: 25px;
      }
    }
  }
  .works {
    &__content {
      border-radius: 3px;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      font-size: $font-size - .8rem;
      margin-top: 25px;
      padding: 30px;
      @include mq(tab) {
        margin-left: auto;
        margin-right: auto;
        max-width: 650px;
      }
      @include mq(pc) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    &__thumb {
      margin-bottom: $mb-work;
      @include mq(tab) {
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
        width: 100%;
      }
      img {
        border-radius: 3px;
        width: 100%;
      }
    }
    &__dt {
      font-size: 24px;
      margin-bottom: 30px;
    }
    &__text {
      @extend .works__dt;
      font-size: 16px;
      margin-bottom: 30px;
      @include mq(tab) {
        font-size: 1.1em;
      }
      &.intro {
        line-height: 1.5;
        text-align: left;
      }
      &.muted {
        color: #666;
        font-size: 0.9em;
        @include mq(tab) {
          font-size: 1.1em;
        }
      }
      &.link {
        border: none;
        margin: 15px 0 0;
      }
    }
  }
}
</style>
