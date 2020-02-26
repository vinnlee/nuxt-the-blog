<template>
  <a-form :form="form" class="post-editor" @submit="handleSubmit">
    <a-form-item class="post-editor__title">
      <a-input
        v-decorator="[
          'title',
          {
            initialValue: dataSource.title,
            rules: [{ required: true, message: 'Title should not be blank!' }]
          }
        ]"
        placeholder="A meaningful title about your article."
      >
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'description',
          {
            initialValue: dataSource.description,
            rules: [
              { required: true, message: 'Description should not be blank!' }
            ]
          }
        ]"
        placeholder="A short description about your article."
      >
      </a-input>
    </a-form-item>
    <a-form-item>
      <client-only>
        <div class="markdown-editor">
          <vue-simplemde
            ref="markdownEditor"
            v-model="markdownContent"
            :configs="markdownOption"
            @input="handleMarkdownInput"
          />
          <a-input
            v-decorator="[
              'body',
              {
                rules: [
                  { required: true, message: 'Content should not be blank!' }
                ]
              }
            ]"
            type="hidden"
          ></a-input>
        </div>
      </client-only>
    </a-form-item>
    <a-form-item>
      <template v-for="tag in tags">
        <a-tag :key="tag" closable :after-close="() => handleTagClose(tag)">
          {{ tag }}
        </a-tag>
      </template>
      <a-input
        v-if="tagVisible"
        ref="tagInput"
        type="text"
        size="small"
        :style="{ width: '80px' }"
        :value="tagValue"
        @change="handleTagChange"
        @blur="handleTagConfirm"
        @keyup.enter="handleTagConfirm"
      />
      <a-tag
        v-else
        style="background: #fff; borderStyle: dashed;"
        @click="showTagInput"
      >
        <a-icon type="plus" />
        New Tag
      </a-tag>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">
        Publish
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: 'createArticle'
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      markdownOption: {
        status: false, // disable the status bar at the bottom
        spellChecker: false // disable spell check
      },
      tagVisible: false,
      markdownContent: '',
      tags: [],
      tagValue: ''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'editor' })
  },
  mounted() {
    // console.log(this.$route.params.slug)
    if (
      !(
        Object.entries(this.dataSource).length === 0 &&
        this.dataSource.constructor === Object
      )
    ) {
      this.$nextTick(function() {
        this.markdownContent = this.dataSource.body
        this.tags = this.dataSource.tagList
      })
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const formField = this.tags.length
            ? { ...values, tagList: this.tags }
            : values

          if (this.action === 'createArticle') {
            const payload = {
              article: formField
            }
            return this.$store.dispatch('setUserArticle', payload)
          }

          if (this.action === 'editArticle') {
            const payload = {
              slug: this.$route.params.slug,
              article: formField
            }
            return this.$store.dispatch('updateUserArticle', payload)
          }
        }
      })
    },
    handleMarkdownInput() {
      this.form.setFieldsValue({
        body: this.markdownContent
      })
    },
    showTagInput() {
      this.tagVisible = true
      this.$nextTick(function() {
        this.$refs.tagInput.focus()
      })
    },
    handleTagChange(e) {
      this.tagValue = e.target.value
    },
    handleTagConfirm() {
      const tagValue = this.tagValue
      let tags = this.tags
      if (tagValue && !tags.includes(tagValue)) {
        tags = [...tags, tagValue]
      }
      Object.assign(this, {
        tags,
        tagVisible: false,
        tagValue: ''
      })
    },
    handleTagClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag)
      this.tags = tags
    }
  }
}
</script>
