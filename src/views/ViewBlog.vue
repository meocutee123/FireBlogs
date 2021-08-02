<template>
  <div class="post-view">
    <div class="container quillWrapper" v-if="currentBlog">
      <h2>{{ currentBlog.blogTitle }}</h2>
      <p>
        Posted on:
        {{
          new Date(currentBlog.date).toLocaleDateString("en-us", {
            dateStyle: "long",
          })
        }}
      </p>
      <img :src="currentBlog.blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="currentBlog.blogHTML"></div>
    </div>
    <div v-else><Loading /></div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
export default {
  name: "PostPreview",
  metaInfo() {
    const title = this.currentBlog?.blogTitle || "FireBlogs";
    const image = this.currentBlog?.blogCoverPhoto || "FireBlogs";
    return {
      title: title,
      meta: [
        {
          name: "description",
          content: "Test",
        },
        {
          property: "og:url",
          content:
            "https://nostalgic-almeida-8ff641.netlify.app/view-blog/AoLix7zZ04QpTEE7HCrP/",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: title,
        },
        {
          name: "og:description",
          content:
            "Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.",
        },
        {
          property: "og:image",
          content: image,
        },
      ],
    };
  },
  components: {
    Loading,
  },
  methods: {},
  computed: {
    currentBlog() {
      return this.$store.getters.getCurrentPost(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }
  /deep/ .ql-editor {
    padding: 0;
    .ql-align-justify {
      text-align: justify;
    }
    p img {
      max-width: 200px;
      height: auto;
      @media (min-width: 500px) {
        max-width: 400px;
      }

      @media (min-width: 700px) {
        max-width: 500px;
      }
      @media (min-width: 900px) {
        max-width: 600px;
      }
      @media (min-width: 1200px) {
        max-width: unset;
      }
    }
    p span {
      text-overflow: wrap;
    }
    blockquote {
      border-left: 4px solid #ccc;
      margin-bottom: 5px;
      margin-top: 5px;
      padding-left: 16px;
    }
    pre {
      white-space: pre-wrap;
      margin-bottom: 5px;
      margin-top: 5px;
      padding: 5px 10px;
      border-radius: 3px;
      &.ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
      }
    }
  }
  h2 {
    margin-bottom: 16px;
    grid-row: 300;
    font-size: 32px;
  }
  p {
    padding-bottom: 16px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
  button {
    align-self: center;
    margin-bottom: 60px;
  }
}
</style>
